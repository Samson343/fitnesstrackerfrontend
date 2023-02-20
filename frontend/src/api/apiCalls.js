const APIURL = `https://fitnesstrac-kr.herokuapp.com/api/`

export const callApi = async ({ url, method, token, body }) => {
    try {
        const options = {
            method: method ? method.toUpperCase() : "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body) 
        };
        if (token) options.headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${APIURL}${url}`, options);
        const result = await response.json();
        if (result.error) {
            throw (result.error);
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
}


// POST /api/users/register
//POST /api/users/login
//PATCH /api/activities/:activityId (*)
//GET /api/activities/:activityId/routines 
//PATCH /api/routines/:routineId (**)
//DELETE /api/routines/:routineId (**)


//done: 
//GET /api/activities
//POST /api/activities (*)
//GET /api/routines
//POST /api/routines (*)
//GET /api/users/me 
//GET /api/users/:username/routines
//POST /api/routines/:routineId/activities
//DELETE /api/routine_activities/:routineActivityId (**)
//PATCH /api/routine_activities/:routineActivityId (**)
