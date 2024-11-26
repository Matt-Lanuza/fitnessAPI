# Workout API


## Team Members:
- **Matt Lanuza**

---

## User Credentials
### Dummy Users
- **email**: dummyuser@workout.com  
- **password**: dummy123 <br><br>

- **email**: teemo@workout.com  
- **password**: teemo123  

---

## Features and Routes:

### User Management:
- **User Registration**  
  - **Route**: `POST /users/register`  
  - **Description**: Allows new users to register.  
- **User Login**  
  - **Route**: `POST /users/login`  
  - **Description**: Authenticates users and returns a token.
- **Get User Details**  
  - **Route**: `GET /users/details`  
  - **Description**: Returns the user's details.

---

### Workout Resources:
- **Add a New Workout**  
  - **Route**: `POST /workouts/addWorkout`  
  - **Description**: Allows users to add a new workout.  
- **Get all Workouts**  
  - **Route**: `GET /workouts/getMyWorkouts`  
  - **Description**: Fetches all workouts.
- **Update a Workout by ID**  
  - **Route**: `PUT /workouts/updateWorkout/:id`  
  - **Description**: Gets all workouts.
- **Delete a Workout by ID**  
  - **Route**: `DELETE /workouts/deleteWorkout/:id`  
  - **Description**: Deletes a workout by its ID.  
- **Complete a Workout Status by ID**  
  - **Route**: `PATCH /workouts/completeWorkoutStatus/:id`  
  - **Description**: Change the status of a workout to complete.  