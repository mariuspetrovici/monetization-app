const redisClient = require("../services/redisClient");
const { Course, Page, UserSubscription, Subscription } = require("../models");
const { checkSubscription } = require("../services/checkSubscription");

const CACHE_EXPIRATION = 5; // 604800 - 1 week in seconds
const cacheKey = "course:list5";

exports.createCourse = async (req, res) => {
  try {
    const { title, subscriptionId, status = "active", createdBy } = req.body;

    // Create the course in the database
    let course = await Course.create({
      title,
      subscriptionId,
      status,
      createdBy,
    });

    // Update the cached course list
    redisClient.get(cacheKey, (err, cachedData) => {
      if (err) {
        console.error("Redis error:", err);
      } else if (cachedData) {
        const courseList = JSON.parse(cachedData);
        courseList.push(course);
        redisClient.setex(
          cacheKey,
          CACHE_EXPIRATION,
          JSON.stringify(courseList)
        ); // Update the cache
      }
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  const userId = req?.user?.id;

  if (!userId) {
    return res.status(403).json({ message: "User not found." });
  }

  try {
    // Fetch the user's subscription details from UserSubscription table
    const userSubscription = await UserSubscription.findOne({
      where: { userId },
    });

    if (!userSubscription) {
      return res.status(403).json({ message: "User subscription not found." });
    }

    // Extract subscription details
    const { subscriptionId, startDate, endDate } = userSubscription;
    const subscriptionDetails = await Subscription.findByPk(subscriptionId);

    // Check if the subscription is still valid
    const isSubscriptionValid =
      (new Date() >= new Date(startDate) && new Date() <= new Date(endDate)) ||
      subscriptionDetails.name === "Free";

    // Check if the subscription has access to the current view/content

    const cachedCourses = await redisClient.get(cacheKey);

    let courses;
    if (cachedCourses) {
      // Parse the cached data
      courses = JSON.parse(cachedCourses);
    } else {
      // Fetch all courses and their pages from the database
      courses = await Course.findAll({
        include: [
          {
            model: Page,
            attributes: ["id", "courseId", "pageNr", "body"],
            as: "pages",
          },
        ],
      });

      // Cache the courses data in Redis (expire after 1 week)
      await redisClient.set(cacheKey, JSON.stringify(courses), {
        EX: CACHE_EXPIRATION,
      });
    }
    const allSubscriptions = await Subscription.findAll();

    // Map courses and filter pages based on user's subscription
    const response = courses.map((course) => {
      const courseJson = course.toJSON();

      if (
        isSubscriptionValid &&
        checkSubscription(
          allSubscriptions,
          course.subscriptionId,
          subscriptionId
        )
      ) {
        const firstPage =
          courseJson.pages && courseJson.pages.length > 0
            ? courseJson.pages.find((page) => page.pageNr === 1)
            : null;

        // User has valid subscription for this course, include pages
        return {
          ...courseJson,
          previewBody: firstPage ? firstPage.body : null,
          previewImage: courseJson.title
            ? `https://dummyimage.com/300x200/cccccc/000000&text=${encodeURIComponent(
                courseJson.title
              )}`
            : null,
        };
      } else {
        // Exclude pages for courses the user doesn't have access to
        return {
          ...courseJson,
          pages: [],
          previewBody: null,
          previewImage: courseJson.title
            ? `https://dummyimage.com/300x200/cccccc/000000&text=${encodeURIComponent(
                courseJson.title
              )}`
            : null,
        };
      }
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      paranoid: false,
      include: [
        {
          model: Page,
          attributes: ["id", "courseId", "pageNr", "body"],
          as: "pages",
          where: { courseId: id },
          required: false,
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subscriptionId, status = "active", createdBy } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.update({
      title,
      status,
      subscriptionId,
      createdBy,
    });

    const courses = await Course.findAll();
    await redisClient.set("courses", JSON.stringify(courses), {
      EX: CACHE_EXPIRATION,
    });

    res.status(200).json(course);

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the course from the database
    await Course.destroy({ where: { id } });

    // Update the cached course list
    const cacheKey = "course:list";
    redisClient.get(cacheKey, (err, cachedData) => {
      if (err) {
        console.error("Redis error:", err);
      } else if (cachedData) {
        const courseList = JSON.parse(cachedData);
        const updatedCourseList = courseList.filter(
          (course) => course.id !== id
        ); // Remove the course
        redisClient.setex(
          cacheKey,
          CACHE_EXPIRATION,
          JSON.stringify(updatedCourseList)
        ); // Update the cache
      }
    });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
