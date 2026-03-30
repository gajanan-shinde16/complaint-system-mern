import Complaint from "../models/Complaint.js";

// Create complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

//get my complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

//get all complaints (admin)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all complaints" });
  }
};


//update complaint status (admin)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
};