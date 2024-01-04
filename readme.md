Every project needs a readme.md file that explains what it is

Remarks from code review and open tasks (UH 2024-01-04):
- It appears to be pure luck, that the room creation is working. Do not change the code as it runs as it is 8)
- Implement a check of the player position and avoid moving across room borders
- Only fetch a quote once, when the key has been found.
- Create an exit door as soon as (e.g. 10) keys have been found.
- Save score in localStorage