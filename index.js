var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const createError = require('http-errors');

app.use(bodyParser.json());

// app.set('env', 'production');   //set API to Production

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    console.log("Request: ", req.body);
    if (((req.body.input || "").toString().trim()) === "") {
        res.status(500).send(
            {
                type: req.app.get('env'),
                error: true,
                description: 'bad request',
            }
        );
    } else {
        next();
    }
});

app.post('/api/firstfactorial', function (req, res) {
    res.send(
        {
            Output: FirstFactorial(req.body.input),
        }
    );
});
app.post('/api/firstreverse', function (req, res) {
    res.send(
        {
            Output: FirstReverse(req.body.input),
        }
    );
});
app.post('/api/alphabetsoup', function (req, res) {
    res.send(
        {
            Output: AlphabetSoup(req.body.input),
        }
    );
});
app.post('/api/palindrome', function (req, res) {
    res.send(
        {
            Output: palindrome(req.body.input),
        }
    );
});


/**===============Handling Error===============*/
app.use(function (req, res, next) {
    var err = createError(404)
    next(err)
})
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(
        {
            type: req.app.get('env'),
            error: true,
            description: req.app.get('env') === 'development' ? err.message : {},
        }
    );
})
/**===============Handling Error===============*/

// set port
const port = 80;
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;

/**Assessment #1*/
function FirstFactorial(num) {
    if (
        typeof(parseInt(num)) == "number" &&
        parseInt(num) >= 1 && parseInt(num) <= 18
    ) {
        return Factorial(parseInt(num));
    } else {
        return false;
    }
}

function Factorial(num) {
    if (num === 0) {
        return 1;
    }
    else {
        return num * Factorial(num - 1);
    }
}
/**Assessment #1*/

/**Assessment #2*/
function FirstReverse(str) {
    return FirstReverseRecursive(str.split(''));
}

function FirstReverseRecursive(array) {
    var char = array.pop();
    if (array.length > 0) {
        return char + FirstReverseRecursive(array);
    }
    else {
        return char;
    }
}
/**Assessment #2*/

/**Assessment #3*/
function AlphabetSoup(str) {
    var option = /[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~0-9 ]/g;    //replace punctuation symbols & number
    str = str.toLowerCase().replace(option, '');
    var sp = str.split('');

    for (i = 0; i < sp.length; i++) {
        sp[i] = sp[i].charCodeAt(0);
    }

    bubbleSort(sp);

    for (i = 0; i < sp.length; i++) {
        sp[i] = String.fromCharCode(sp[i]);
    }

    return sp.join('');
}

function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
/**Assessment #3*/

/**Assessment #4*/
function palindrome(str) {
    var option = /[\W_]/g;  // \W is equivalent to [^A-Za-z0–9_]
    var lowRegStr = str.toLowerCase().replace(option, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
}
/**Assessment #4*/
