const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, UserSubscription } = require("../models");
const {
  subscriptionController,
} = require("../controllers/subscriptionsController");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    const subscription = await UserSubscription.findOne({
      where: { userId: user.id },
    });

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.json({
    message: "Logout successfully",
  });
};

exports.checkAuth = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    let subscription = await UserSubscription.create({
      userId: user.id,
      subscriptionId: "e4184678-73ae-4982-8496-96b35e04177a",
      price: 0,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        firstName,
        lastName,
        email,
        role,
        subscription: {
          id: subscription.subscriptionId,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, subscription } = req.body;

    let updatedUser = {};
    if (firstName || lastName || email) {
      updatedUser = await User.update(
        {
          firstName,
          lastName,
          email,
        },
        {
          where: { id },
        }
      );
    }

    res.json({
      message: "User updated successfully",
      user: {
        ...updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
