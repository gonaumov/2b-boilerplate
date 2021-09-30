# Of course I can use jq
# https://stedolan.github.io/jq/
# but in this case I would like to
# made implementation maximally portable
function getvalueFromJson(response, token, currency) {
    command="node -e 'console.log(JSON.parse(" response ")." token "." currency ");'"
    command | getline commandResult
    close(command)
    return commandResult
}

BEGIN {
    FS = "[[:space:]]*,[[:space:]]*"
}
NR>1 {
    if($2 ~ /DEPOSIT/) {
        result[$3]+=$4;
    }
    if($2 ~ /WITHDRAWAL/){
        result[$3]-=$4;
    }
}
END {
    params=""
    for (key in result) {
        params=params "," key
    }
    sub(/,/,"",params)
    # I am using this because there was need to prepare
    # the json berofe pass it to node. Escaping was
    # a bit tricky.
    # sed 's/\x22/\x5c\x5c\x22/g' | sed 's/.*/\x22&\x22/g'
    cmd="curl -s 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=" params "&tsyms=USD' | sed 's/\x22/\x5c\x5c\x22/g' | sed 's/.*/\x22&\x22/g'"
    cmd | getline response
    printf "token,amount,portfolio_value_in_usd\n"
    for (key in result) {
        amountInUsd=result[key]*getvalueFromJson(response,key,"USD")
        printf "%s,%.3f,%.3f\n", key, result[key], amountInUsd
    }
}