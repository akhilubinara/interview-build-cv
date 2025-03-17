

const { TABLE_NAME } = require("../common/tablenames");
const { API_RESPONSE_MESSAGES } = require("../common/constant");
const createKnexInstance = require("../../../config/knex");


module.exports = {
    _createUser: async (data) => {
        const knex = createKnexInstance();
        const resObj = {
            success: false,
            message: '',
            data: [] 
        };

        try {
            // Check user exists or not
            const existingUser = await knex(TABLE_NAME.USER)
                .select("Id")
                .where("Phone", data.phone)
                .orWhere("Email", data.email)
                .first();

            if (existingUser) {
                resObj.message = API_RESPONSE_MESSAGES.USER_EXISTS;
                return resObj;
            }

            await knex.transaction(async (trx) => {
                // Insert into m_user
                const [userId] = await trx(TABLE_NAME.USER)
                    .insert({
                        Name: data.name,
                        Email: data.email,
                        Phone: data.phone,
                        Description: data.description,
                        LastUpdatedOn: knex.fn.now(),
                        CreatedOn: knex.fn.now(),
                        IsActive: 1,
                        IsDeleted: 0
                    })
                    .returning("Id");

                // Insert into t_education
                if (data.education && data.education.length > 0) {
                    const educationData = data.education.map((edu) => ({
                        InstitutionName: edu.InstitutionName,
                        CourseName: edu.CourseName,
                        StartYear: edu.StartYear,
                        EndYear: edu.EndYear,
                        Percentage: edu.Percentage,
                        Description: "",
                        UserId: userId,
                        CreatedOn: knex.fn.now()
                    }));
                    await trx(TABLE_NAME.EDUCATION).insert(educationData);
                }

                // Insert into t_skill
                if (data.skills && data.skills.length > 0) {
                    const skillData = data.skills.map((skill) => ({
                        SkillName: skill.SkillName,
                        Description: skill.Description,
                        UserId: userId,
                        IsActive: 1,
                        CreatedOn: knex.fn.now()
                    }));
                    await trx(TABLE_NAME.SKILL).insert(skillData);
                }

                // Insert into t_work_experience
                if (data.workExperience && data.workExperience.length > 0) {
                    const workData = data.workExperience.map((work) => ({
                        WorkTitle: work.WorkTitle,
                        CompantName: work.CompantName,
                        YearOfExperience: work.YearOfExperience,
                        PositionNumber: work.PositionNumber,
                        UserId: userId,
                        CreatedOn: knex.fn.now()
                    }));
                    await trx(TABLE_NAME.WORK_EXPERIENCE).insert(workData);
                }

                resObj.success = true;
                resObj.message = API_RESPONSE_MESSAGES.USER_CREATED;
                resObj.data = { userId };
            });

            return resObj;
        } catch (error) {
            console.error("Error in _createUser:", error);
            resObj.message = error.message || API_RESPONSE_MESSAGES.SERVER_ERROR;
            return resObj;
        }
        finally{
            knex.destroy();
        }
    },
    _getUserList: async (page = 1, limit = 10) => {
        const knex = createKnexInstance();
        const resObj = {
            success: false,
            message: '',
            data: [],
            totalRecords: 0,
            currentPage: page,
            totalPages: 0
        };
    
        try {
            // Get total user count for pagination
            const [{ totalCount }] = await knex(TABLE_NAME.USER).count('Id as totalCount');
            
            // First, get the user base information with pagination
            const users = await knex(TABLE_NAME.USER)
                .select('Id', 'Name', 'Email', 'Phone', 'Description', 'CreatedOn')
                .limit(limit)
                .offset((page - 1) * limit);
                
            // Now get related data for each user
            if (users.length > 0) {
                // Get all user IDs from the paginated results
                const userIds = users.map(user => user.Id);
                
                // Get all education data for these users
                const education = await knex(TABLE_NAME.EDUCATION)
                    .select('*')
                    .whereIn('UserId', userIds);
                    
                // Get all work experience data for these users
                const workExperience = await knex(TABLE_NAME.WORK_EXPERIENCE)
                    .select('*')
                    .whereIn('UserId', userIds);
                    
                // Get all skills data for these users
                const skills = await knex(TABLE_NAME.SKILL)
                    .select('*')
                    .whereIn('UserId', userIds);
                    
                // Map related data to each user as arrays
                const result = users.map(user => {
                    // Find all related records for this user
                    const userEducation = education.filter(e => e.UserId === user.Id);
                    const userWorkExp = workExperience.filter(w => w.UserId === user.Id);
                    const userSkills = skills.filter(s => s.UserId === user.Id);
                    
                    // Return user with related data as arrays
                    return {
                        ...user,
                        education: userEducation,
                        workExperience: userWorkExp,
                        skills: userSkills
                    };
                });
                
                resObj.data = result;
            }
            
            // Set response object
            resObj.success = true;
            resObj.message = API_RESPONSE_MESSAGES.SUCCESS;
            resObj.totalRecords = totalCount;
            resObj.totalPages = Math.ceil(totalCount / limit);
        } 
        catch (error) {
            console.error("Error in _getUserList:", error);
            resObj.message = error.message || API_RESPONSE_MESSAGES.SERVER_ERROR;
        } 
        finally {
            knex.destroy();
        }
    
        return resObj;
    },
    
    _getUserDetails: async (userId) => {
        const knex = createKnexInstance();
        const resObj = {
            success: false,
            message: '',
            data: null, // Changed from array to single object since we're getting details for one user
        };
    
        try {
            // First, get the user base information
            const user = await knex(TABLE_NAME.USER)
                .select('Id', 'Name', 'Email', 'Phone', 'Description', 'CreatedOn')
                .where('Id', userId)
                .first();
    
            if (!user) {
                resObj.message = 'User not found';
                return resObj;
            }
    
            // Get all education records for this user
            const education = await knex(TABLE_NAME.EDUCATION)
                .select('*')
                .where('UserId', userId);
    
            // Get all work experience records for this user
            const workExperience = await knex(TABLE_NAME.WORK_EXPERIENCE)
                .select('*')
                .where('UserId', userId);
    
            // Get all skills for this user
            const skills = await knex(TABLE_NAME.SKILL)
                .select('*')
                .where('UserId', userId);
    
            // Combine user data with related data arrays
            const result = {
                ...user,
                education: education || [],
                workExperience: workExperience || [],
                skills: skills || []
            };
    
            // Set response object
            resObj.success = true;
            resObj.message = API_RESPONSE_MESSAGES.SUCCESS;
            resObj.data = result;
        } 
        catch (error) {
            console.error("Error in _getUserDetails:", error);
            resObj.message = error.message || API_RESPONSE_MESSAGES.SERVER_ERROR;
        } 
        finally {
            knex.destroy();
        }
    
        return resObj;
    },
    _updateUser: async (userId, data) => {
        const knex = createKnexInstance();
        const resObj = {
            success: false,
            message: '',
            data: null
        };

        try {
            // Check if user exists
            const existingUser = await knex(TABLE_NAME.USER).where('Id', userId).first();
            if (!existingUser) {
                resObj.message = API_RESPONSE_MESSAGES.NOT_FOUND;
                return resObj;
            }

            // Update user details
            await knex(TABLE_NAME.USER)
                .where('Id', userId)
                .update({
                    Name: data.name,
                    Email: data.email,
                    Phone: data.phone,
                    Description: data.description,
                    LastUpdatedOn: knex.fn.now()
                });

            // Update education
            if (data.education && data.education.length > 0) {
                await knex(TABLE_NAME.EDUCATION).where('UserId', userId).del();
                await knex(TABLE_NAME.EDUCATION).insert(
                    data.education.map(edu => ({
                        InstitutionName: edu.InstitutionName,
                        CourseName: edu.CourseName,
                        StartYear: edu.StartYear,
                        EndYear: edu.EndYear,
                        Percentage: edu.Percentage,
                        UserId: userId,
                        CreatedOn: knex.fn.now()
                    }))
                );
            }

            // Update work experience
            if (data.workExperience && data.workExperience.length > 0) {
                await knex(TABLE_NAME.WORK_EXPERIENCE).where('UserId', userId).del();
                await knex(TABLE_NAME.WORK_EXPERIENCE).insert(
                    data.workExperience.map(work => ({
                        WorkTitle: work.WorkTitle,
                        CompantName: work.CompantName,
                        YearOfExperience: work.YearOfExperience,
                        PositionNumber: work.PositionNumber,
                        UserId: userId,
                        CreatedOn: knex.fn.now()
                    }))
                );
            }

            // Update skills
            if (data.skills && data.skills.length > 0) {
                await knex(TABLE_NAME.SKILL).where('UserId', userId).del();
                await knex(TABLE_NAME.SKILL).insert(
                    data.skills.map(skill => ({
                        SkillName: skill.SkillName,
                        Description: skill.Description,
                        UserId: userId,
                        IsActive: true,
                        CreatedOn: knex.fn.now()
                    }))
                );
            }

            resObj.success = true;
            resObj.message = API_RESPONSE_MESSAGES.SUCCESS;
            resObj.data = { userId };
        } 
        catch (error) {
            console.error("Error in _updateUser:", error);
            resObj.message = error.message || API_RESPONSE_MESSAGES.SERVER_ERROR;
        } 
        finally {
            knex.destroy();
        }

        return resObj;
    }

}