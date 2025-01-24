const Resource = require("../models/Resource")
const StudyMaterial = require("../models/Resource"); // Ensure correct path to your model

const getResources = async (req, res) => {
  try {
    console.log("Fetching resources...");
    const resources = await Resource.find().sort({ id: 1 }); // Fetch resources

    if (!resources.length) {
      console.log("No resources found.");
    } else {
      console.log("Resources fetched successfully:", resources);
    }

    const transformedResources = resources.map(({ _id, title, description, year, department, fileUrl }) => ({
      id: _id.toString(),
      title,
      description,
      year,
      department,
      fileUrl,
    }));

    res.status(200).json(transformedResources);
  } catch (error) {
    console.error("Error fetching resources:", error.message);
    res.status(500).json({ message: "Failed to fetch resources. Please try again later." });
  }
};



// Create a new resource
const createResource = async (req, res) => {
  try {
    const { title, description, branch, year, fileUrl } = req.body;

    // Validation: Ensure all fields are present
    if (!title || !description || !branch || !year || !fileUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const resource = new Resource({
      title,
      description,
      department: branch, // Map branch to department
      year,
      fileUrl,
    });

    await resource.save();
    res.status(201).json({ message: "Resource uploaded successfully!" });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid input data.", details: error.errors });
    }

    console.error("Error saving resource:", error);
    res.status(500).json({ error: "Failed to upload resource." });
  }
};

const giveSearchResults = async (req, res) => {
  const { search, department, year, page = 1, limit = 100 } = req.query;

  try {
    // Validate and construct the query
    const query = {};

    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: "i" }; // Case-insensitive search
    }
    if (department && department.trim() !== "") {
      query.department = department.trim(); // Exact match for department
    }
    if (year && year.trim() !== "") {
      query.year = year.trim(); // Exact match for year
    }

    // Debugging logs
    console.log("Received query params:", req.query);
    console.log("Constructed query:", query);

    const skip = (page - 1) * limit; // Pagination calculation
    const materials = await StudyMaterial.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalCount = await StudyMaterial.countDocuments(query);

    res.json({
      materials,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error in giveSearchResults:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch study materials.", details: err.message });
  }
};


module.exports = {
  getResources,
  createResource,
  giveSearchResults,
}

