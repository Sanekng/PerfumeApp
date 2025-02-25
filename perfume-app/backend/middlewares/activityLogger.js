// const Activity = require('../models/activity.model');
// const AppError = require('../utils/app.error');
//
// exports.logActivity = async (req, res, next) =>{
//     try {
//         const {method, originalUrl} = req;
//         let actionType;
//         switch (method) {
//             case 'POST':
//                 actionType = 'CREATE';
//                 break;
//             case 'PUT':
//             case 'PATCH':
//                 actionType = 'UPDATE';
//                 break;
//             case 'DELETE':
//                 actionType = 'DELETE';
//                 break;
//             case 'GET':
//                 actionType = 'READ';
//                 break;
//             default:
//                 actionType = 'UNKNOWN';
//         }
//
//         const resourceType = originalUrl.split('/')[1];
//         const resourceId = originalUrl.split('/')[2];
//         console.log(resourceType, resourceId)
//
//         const activity = new Activity({
//             actionType,
//             resourceType,
//             resourceId,
//             method
//         });
//
//         await activity.save();
//         next();
//     } catch (error) {
//         throw (new AppError(error.message, 500));
//     }
// }