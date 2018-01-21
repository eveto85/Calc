<<<<<The grid is an overkill just to show how easy it is to copy/improve bootstrap's grid with a single page in styled components. For such a tiny project I'd just use flexbox not an actual grid base on flexbox.>>>>>>

TODO: 

Test if all possible cases that should be forbidden are forbidden!
Add tests!!!
Cleanup;
Add limitation for large numbers;
Fix styling for large numbers; add animations/transitions;

Future additions: 

Production && consider using safe-eval or write/include a parser, consider operator presedence;
Better messaging/notification ux;
Add calculations history and possibility to revive an old calculation
Split the reducer and cleanup;

Code/file structure

If it were a huge project I'd probably separate things a bit differently.
Maybe domain/page based.

/Product
    Product-list.js
    Product.js
    Slider.js
/User
    register.js
    profile.js
/Checkout
    basket.js
    minibasket.js
/Store
    ProductReducer.js
    ProductActions.js
    Store.js
/Tests
    App.test.js
    Product.test.js

etc.etc...
or even move redux files in corresponding domains/routes.(Never tried that approach though)