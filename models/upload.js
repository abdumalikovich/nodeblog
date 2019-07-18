const mongoose = require('mongoose');

const upload = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

upload.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('collectionUploads', upload)
