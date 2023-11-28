const Score = function(coin1, coin2, time) {
    const timeConstant = 30;
    const scoreConstant = 10;

    let totalScore = (coin1 + coin2 + scoreConstant) * (timeConstant / (timeConstant + time));

    return Math.floor(totalScore) * 100;
}