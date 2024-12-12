const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        status: {
          type: String,
          enum: ['pending', 'in-progress', 'completed', 'cancelled'], 
          default: 'pending', 
        },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'medium',
        },
        dueDate: {
          type: Date,
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
          required:true
        }
      },
      {
        timestamps: true,
      }
)

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id; 
    delete ret.__v;
  }
}); 

const Tasks = new mongoose.model('Task', taskSchema)

module.exports = Tasks