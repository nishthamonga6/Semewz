import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcryptjs"

const app = express()

/* =========================
   Config
========================= */
const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/semewz"

/* =========================
   Middleware
========================= */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
  ],
  credentials: true
}))
app.use(express.json())

/* =========================
   MongoDB Connection
========================= */
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true
    })

    console.log("✅ Connected to MongoDB")
    console.log(`📦 Database: ${mongoose.connection.db.databaseName}`)
    console.log(`🔌 URI: ${MONGO_URI}`)
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message)
    process.exit(1)
  }
}

/* =========================
   User Schema
========================= */
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  passwordHash: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

/* =========================
   Order Schema
========================= */
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String }
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String }
  },
  subtotal: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  paymentMethod: {
    type: String,
    enum: ["qr_code", "paytm", "cash_on_delivery"],
    default: "cash_on_delivery"
  }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

/* =========================
   Helpers
========================= */
const toPublicUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt
})

/* =========================
   Routes
========================= */

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    }

    const dbName = mongoose.connection.db?.databaseName || "unknown"
    const collections = await mongoose.connection.db
      ?.listCollections()
      .toArray()

    const userCount = await User.countDocuments()

    res.json({
      status: "ok",
      mongodb: states[dbState],
      database: dbName,
      collections: collections?.map(c => c.name) || [],
      userCount
    })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullName,
      email,
      passwordHash
    })

    console.log(`✅ User created: ${user.email}`)

    res.status(201).json({ user: toPublicUser(user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Signup failed" })
  }
})

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    console.log(`✅ User logged in: ${user.email}`)

    res.json({ user: toPublicUser(user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Login failed" })
  }
})

// Create order (after cart checkout)
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, items, shippingAddress, location, subtotal, taxAmount, totalAmount, paymentMethod } = req.body

    if (!userId || !items?.length || !shippingAddress || totalAmount == null) {
      return res.status(400).json({ message: "Missing required order fields" })
    }

    const validPayment = ["qr_code", "paytm", "cash_on_delivery"].includes(paymentMethod)
      ? paymentMethod
      : "cash_on_delivery"

    const order = await Order.create({
      userId,
      items: items.map(i => ({
        productId: String(i.id),
        name: i.name,
        price: Number(i.price),
        quantity: Number(i.quantity),
        size: i.size || "",
        image: i.image
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
        country: shippingAddress.country
      },
      location: location ? {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address
      } : undefined,
      subtotal: Number(subtotal),
      taxAmount: Number(taxAmount || 0),
      totalAmount: Number(totalAmount),
      status: "pending",
      paymentMethod: validPayment
    })

    const { _id, ...orderRest } = order.toObject()
    console.log(`✅ Order created: ${order._id} for user ${userId}`)
    res.status(201).json({ order: { id: _id.toString(), ...orderRest } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Order failed" })
  }
})

// Get orders for a user
app.get("/api/orders", async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) {
      return res.status(400).json({ message: "userId required" })
    }
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean()
    res.json({ orders: orders.map(o => ({ ...o, id: o._id.toString(), _id: undefined })) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
})

// Get user details with orders (for profile / admin view)
app.get("/api/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" })
    }

    const user = await User.findById(userId).lean()
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean()

    const { passwordHash, __v, ...userSafe } = user
    res.json({
      user: {
        id: user._id.toString(),
        ...userSafe,
        _id: undefined
      },
      orders: orders.map(o => ({
        id: o._id.toString(),
        paymentMethod: o.paymentMethod,
        totalAmount: o.totalAmount,
        status: o.status,
        shippingAddress: o.shippingAddress,
        items: o.items,
        createdAt: o.createdAt,
        _id: undefined
      }))
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch user" })
  }
})

/* =========================
   Start Server AFTER DB
========================= */
async function startServer() {
  await connectDB()

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running → http://localhost:${PORT}`)
  })
}

startServer()