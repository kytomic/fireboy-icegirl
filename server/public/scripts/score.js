const Score = function(coin1, coin2, time) {
    const timeConstant = 300;
    const scoreConstant = 300;

    let totalScore = (coin1 + coin2 + scoreConstant) * (timeConstant / (timeConstant + time));

    return Math.floor(totalScore);
}