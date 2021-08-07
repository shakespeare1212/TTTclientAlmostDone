 var moveCount = 0;
 var gameArray = ['1','2','3','4','5','6','7','8','9'];
 
 
 // use only for testing, covers every possible win.
// var testGames  = [

//     ['1','2','3','4','5','6','7','8','9'],  // empty board
//     ['X','X','X','O','O','6','7','8','9'],  // X wins, top row
//     ['O','O','6','X','X','X','7','O','9'],  // X wins, middle row
//     ['X','X','3','O','O','6','X','X','X'],  // X wins, bottom row
//     ['O','O','O','X','1','X','7','8','9'],  // O wins, top row
//     ['X','X','2','O','O','O','7','8','9'],  // O wins, Middle row
//     ['X','1','X','O','O','6','O','O','O'],  // O wins, bottom row
//     ['X','O','O','X','X','6','X','O','O'],  // X wins left col
//     ['1','X','X','4','X','O','7','X','O'],  // X wins center col
//     ['1','O','X','O','X','X','O','O','X'],  // X wins right col
//     ['O','X','X','O','O','6','O','X','X'],  // O wins left col
//     ['1','O','O','4','O','X','7','O','X'],  // O windw center col
//     ['1','X','O','X','O','O','X','X','O'],  // O wins right col
//     ['X','1','X','X','O','O','O','7','X'],  // X wins diag up left to low right
//     ['X','X','2','X','X','6','O','8','X'],  // X wins diag up right to low left
//     ['O','2','X','O','O','6','X','8','O'],  // O wins diag up left to low right
//     ['X','2','O','X','O','6','O','X','9']   // O wins diag up right to low left
   
// ]


function ServerMakeMove (index, char) {
    gameArray[index-1] = char;
    var newState = checkWinner();
    return newState;

}


function threeOfAKind(a,b,c)
{
    return !!(a == b && b == c);
}


function checkWinner()

{
    let gameArrayInternal = gameArray.slice();
    
    console.log("checkWinner was called");
    var weHaveAWin = false;
    var winner = 'n';
    // whereWin codes will be: nw, tr, mr, br, lc, cc, rc, dl, dr
    // meaning repectively:    no win, top row, middle row, bottom row, left col, center col, right col,
    //                         diagonal up left to down right, diagonal down left to up right 
    var whereWin = 'nw';
    //check top row
    weHaveAWin = threeOfAKind(
        gameArrayInternal[0],
        gameArrayInternal[1],
        gameArrayInternal[2]
    )
    if (weHaveAWin)
    {
        winner = gameArrayInternal[0];
        whereWin = 'tr';
    }

        
    //console.log("Winner top row? " + weHaveAWin);
    //check middle row
    weHaveAWin = threeOfAKind(
        gameArrayInternal[3],
        gameArrayInternal[4],
        gameArrayInternal[5]
    )
    if (weHaveAWin)
    {
        winner = gameArrayInternal[3];
        whereWin = 'mr';
    }

    //console.log("Winner middle row? " + weHaveAWin);

    //check bottom row
    weHaveAWin = threeOfAKind(
        gameArrayInternal[6],
        gameArrayInternal[7],
        gameArrayInternal[8]
    )

    if (weHaveAWin)
    {
        winner = gameArrayInternal[6];
        whereWin = 'br';
    }

   // console.log("Winner bottom row? " + weHaveAWin);
    
    //check left col
      weHaveAWin = threeOfAKind(
        gameArrayInternal[0],
        gameArrayInternal[3],
        gameArrayInternal[6]
    )

    if (weHaveAWin)
    {
        winner = gameArrayInternal[0];
        whereWin = 'lc';
    }


    //console.log("Winner left col? " + weHaveAWin);

    //check center col
    weHaveAWin = threeOfAKind(
        gameArrayInternal[1],
        gameArrayInternal[4],
        gameArrayInternal[7]
    )

    if (weHaveAWin)
    {
        winner = gameArrayInternal[1];
        whereWin = 'cc';
    }


    //console.log("Winner center col? " + weHaveAWin);

    
    //check right col
    weHaveAWin = threeOfAKind(
        gameArrayInternal[2],
        gameArrayInternal[5],
        gameArrayInternal[7]
    )


    if (weHaveAWin)
    {
        winner = gameArrayInternal[2];
        whereWin = 'rc';
    }


    //console.log("Winner right col? " + weHaveAWin);


    //check diaginal left top to low right
    weHaveAWin = threeOfAKind(
        gameArrayInternal[0],
        gameArrayInternal[4],
        gameArrayInternal[8]
    )

    if (weHaveAWin)
    {
        winner = gameArrayInternal[0];
        whereWin = 'dl';
    }


    //console.log("Winner diaginal left top to low right? " + weHaveAWin);


    //check diaginal right top to low left
    weHaveAWin = threeOfAKind(
        gameArrayInternal[2],
        gameArrayInternal[4],
        gameArrayInternal[6]
    )

    if (weHaveAWin)
    {
        winner = gameArrayInternal[1];
        whereWin = 'dr';
    }

    // console.log("Winner diaginal right top to low left? " + weHaveAWin);
    // console.log("The winner was: " + winner);
    // console.log("Win location was: " + whereWin);
    // console.log("*---------------------------* " );
    // console.log("    " );
    
    gameArray = gameArrayInternal;
    let gameState = gameArray + "|" + weHaveAWin + "|" + "winner" +"|" + whereWin;
    return gameState;
    
}  // end checkWinner()


$(document).ready(function () {
    moveCount = 0;
    
    $("#testGameString").click(function() {
        
        for (var i=0; i < testGames.length; i++)
        {
         
            gameArray = testGames[i];
            console.log(gameArray.join(""));
            checkWinner();
       

        }
        
        
               

    });
    
    $("#movePiece").click(function() {
        

        var   pieceType = $("#piece-type").val()
        var   slot      = $("#slot").val();    
    
    
        if  ((pieceType == "x") || 
             (pieceType == "X") || 
             (pieceType == "o") || 
             (pieceType == "O"))
        {
            pieceType = pieceType.toUpperCase();;
               if (slot  > 9)
                {
                    alert("The highest slot number is 9.");
                    $("#slot").val("");
                    return;
                }
                if (slot < 1)
                {
                    alert("The lowest slot number is 1.");
                    $("#slot").val("");
                    return;
                }
                
                gameString = placePiece(slot,pieceType);
                var out = document.getElementById("outPut");
                moveCount++;
                out.innerHTML = gameString;
               // new piece is now in place.
               if (moveCount > 2)
               {
                   checkWinner();
               }
        } else {
            alert("piece type must be on character, an x or an o");
           $("#piece-type").val("");
            return;
        }  // end if/else, which checks for clean data and call the checkWin Function.
    
    }); // end "#movePiece").click

}); // end (document).ready()

