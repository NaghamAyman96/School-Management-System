const School = require('../libs/models/school');

exports.createSchool = async (req, res) => {
  try {
    const newSchool = new School({
      name: req.body.name,
      address: req.body.address,
      admin: req.body.admin // Assuming you pass the admin user ID
    });
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().populate('admin');
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate('admin');
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchoolById = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSchoolById = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
