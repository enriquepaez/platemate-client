# Project Name

## [See the App!](https://platemate-app.netlify.app/)

![App Logo](https://github.com/enriquepaez/platemate-client/tree/master/src/assets/logo.png)

## Description

**NOTE -** Describe your project in one/two lines.
#### [Client Repo here](https://github.com/enriquepaez/platemate-client)
#### [Server Repo here](https://github.com/enriquepaez/platemate-server)

## Technologies & Libraries used

- HTML
- CSS
- Javascript
- React
- axios
- React Context
- React Router
- Cloudinary

## Backlog Functionalities

- Nutritional Information: Provide detailed nutritional analysis for each recipe.
- Community Features: Follow favorite chefs or friends and see their recipes and activity.
- Random Menus: Generate a random weekly menu

# Client Structure

## Client Routes

## React Router Routes (React App)
| Path                      | Page              | Components              | Permissions              | Behavior                                                             |
| ------------------------- | ------------------| ----------------------- | ------------------------ | -------------------------------------------------------------------  |
| `/`                       | Home              |                         | public                   | Home page                                                            |
| `/signup`                 | Signup            |                         | public                   | Signup form, link to login, navigate to homepage after signup        |
| `/login`                  | Login             |                         | public                   | Login form, link to signup, navigate to homepage after login         |
| `/profile`                | Profile           | EditProfile             | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session                    |
| `/profile/edit`           | EditProfile       |                         | user only `<IsPrivate>`  | Allows the user to edit his/her profile                              |
| `/myrecipes`              | MyRecipes         | RecipeList              | user only `<IsPrivate>`  | The user can check recipes created by him/her or marked as favorites |
| `/addrecipe`              | AddRecipe         | IngredientList          | user only `<IsPrivate>`  | Create a new recipe                                                  |
| `/editrecipe`             | EditRecipe        | IngredientList          | user only `<IsPrivate>`  | Edit a user´s recipe                                                 |
| `/communityrecipes`       | CommunityRecipes  | RecipeList              | user only `<IsPrivate>`  | Shows recipes created by all users                                   |
| `/recipe/:recipeId`       | RecipeDetails     |                         | user only `<IsPrivate>`  | Shows the details of one recipe                                      |
| `/weekplanner`            | WeekPlanner       | DailyMeal, ShoppingList | user only `<IsPrivate>`  | The user can check his/her week meal plan                            |
| `/weekplanner/stepper`    | WeeklyMealStepper | DailyMeal               | user only `<IsPrivate>`  | Allows the user to create or edit his/her week meal plan             |

## Other Components

- Navbar
- Footer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

## Context

- auth.context
  
## Links

### Collaborators

[Enrique Paez Pozo](https://github.com/enriquepaez)

### Project

[Repository Link Client](https://github.com/enriquepaez/platemate-client)

[Repository Link Server](https://github.com/enriquepaez/platemate-server)

[Deploy Link](https://platemate-app.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/19Gtdg2P4kSg-_5V6hTgJXgIwRKgGNz5LkBFyTqtzvuc/edit#slide=id.g30e9aa4b67b_0_14)