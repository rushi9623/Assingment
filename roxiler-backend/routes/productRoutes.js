const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Route to fetch all products with optional search and pagination
router.get("/", async (req, res) => {
    try {
        const { month, search, page = 1, perPage = 10 } = req.query;

        const query = {};
        if (search) {
            const regex = new RegExp(search, "i"); // Case-insensitive search
            query.$or = [
                { title: regex },
                { description: regex },
                { price: regex },
            ];
        }

        // Add month filter
        if (month) {
            const monthNum = month.padStart(2, '0'); // Ensure month is two digits
            const startOfMonth = new Date(`2022-${monthNum}-01`);
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);

            query.dateOfSale = { $gte: startOfMonth, $lt: endOfMonth };
        }

        const products = await Product.find(query)
            .limit(perPage)
            .skip((page - 1) * perPage);

        const total = await Product.countDocuments(query);

        res.json({
            products,
            total,
            page,
            perPage,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Statistics Endpoint
router.get("/statistics", async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: "Month parameter is required." });
        }

        console.log(`Fetching statistics for month: ${month}`); // Log the month for debugging

        const monthNum = month.padStart(2, '0'); // Ensure month is two digits
        const startOfMonth = new Date(`2022-${monthNum}-01`);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const totalSoldItems = await Product.countDocuments({
            sold: true,
            dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
        });

        const totalNotSoldItems = await Product.countDocuments({
            sold: false,
            dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
        });

        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                    sold: true,
                    dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
                },
            },
            { $group: { _id: null, total: { $sum: "$price" } } },
        ]);

        res.json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems,
        });
    } catch (error) {
        console.error("Error fetching statistics:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ... Other routes (e.g., Bar Chart, Pie Chart) would go here

module.exports = router;
