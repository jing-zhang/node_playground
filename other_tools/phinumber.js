var phi = [];

function printPhyNumber()
{
    const MAX=10;
    var firstNumber = 1;
    var secondNumber = 2
    var temp = 1;
    console.log('%d [%s] phi number %d',1, Date.now(), 1);
    console.log('%d [%s] phi number %d',2, Date.now(), 2);
    for(var i = 3 ; i< MAX; i++)
    {
        temp = secondNumber;
        secondNumber = firstNumber + secondNumber;
        firstNumber = temp;
        console.log('%d [%s] print number %d',i, Date.now(), secondNumber);
    }
}

printPhyNumber();