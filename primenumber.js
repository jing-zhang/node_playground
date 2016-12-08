var pri = [];

function isPrimeNumber(num)
{
    for(var j = 0; j< pri.length;j++)
    {
        if(num % pri[j] == 0)
          return 0;
    }
    return 1;
}

function printPrimeNumber()
{
    const MAX=1000;
    var count = 0;

    for(var i = 3 ; i<MAX; i+=2)
    {
        if(isPrimeNumber(i)==1)
        {
            count++;
            pri.push(i);
            console.log('%d [%s] print number %d',count, Date.now(), i);
        }
    }
}

printPrimeNumber();