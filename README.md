# floor-plan-manager
Floor plan manager app! Builds and saves custom floor plans.

# Requirements
`pipenv` -- If you don't have this, run `pip install pipenv` in your shell.

The frontend runs on `localhost:3000`, and the backend runs on `localhost:8000`.
# Usage
First, start your server, which we'll run in a virtual pip environment.

`pipenv shell` to start the pip shell.  Then, navigate to `floor-plan-manager/backend`.  Run `pipenv install django` and then `python manage.py runserver` inside the pip shell.
You should see some output followed by `Quit the server with CONTROL-C`, or something like that.

Next, start your React application.  Navigate to the `floor-plan-manager/ui` directory and run `npm i` to install the necessary dependencies.  Then, run `npm start`.  This should build your front end and open up `localhost:3000` on your browser.

Once you've created an account and logged in, try creating a floor plan in Creator page.  It will ask you to fill out the general specifications of the floor plan.  This can be a little tricky (note -- the width/length of the rooms must be a factor of the overall width AND the overall height.  You also need at least 2 doors per room for any floor plan bigger than 2 rooms).

After submitting the requirements, the system will generate a floor plan and save it to your account.  You can then see it in the Listing page. 
This page will house all of your past floor plans, and you can click on any plan to view it.  See the individual rooms and the location of each door.
# Future features
I'd like to implement multi-floor floor plans that show the user how multiple floors fit together.  I'd also like to make it a bit more secure.
