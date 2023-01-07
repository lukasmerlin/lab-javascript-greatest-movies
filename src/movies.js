// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    let directors = moviesArray.map(function (movie) {
        return movie.director
    })
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let spielbergMovies = moviesArray.filter(function (movie) {
        return movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    })
    return spielbergMovies.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0
    }
    let totalScore = moviesArray.reduce(function (acc, movie) {
        if (movie.score) {
            return acc + movie.score
        } else {
            return acc
        }
    }, 0)
    let averageScore = totalScore / moviesArray.length
    return Math.round(averageScore * 100) / 100
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaMovies = moviesArray.filter(function (movie) {
        return movie.genre.includes("Drama")
    })
    return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let moviesCopy = JSON.parse(JSON.stringify(moviesArray))
    let sortedMovies = moviesCopy.sort(function (a, b) {
        if (a.year === b.year) {
            return a.title.localeCompare(b.title)
        } else {
            return a.year - b.year
        }
    })
    return sortedMovies
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let moviesCopy = JSON.parse(JSON.stringify(moviesArray))
    let sortedMovies = moviesCopy.sort(function (a, b) {
        return a.title.localeCompare(b.title)
    })
    let firstTwenty = sortedMovies.slice(0, 20)
    let firstTwentyTitles = firstTwenty.map(function (movie) {
        return movie.title
    })
    return firstTwentyTitles
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let moviesCopy = JSON.parse(JSON.stringify(moviesArray))
    let moviesInMinutes = moviesCopy.map(function (movie) {
        let duration = movie.duration
        let hours = 0
        let minutes = 0
        if (duration.includes("h")) {
            hours = parseInt(duration)
        }
        if (duration.includes("min")) {
            minutes = parseInt(duration.slice(duration.indexOf(" ") + 1))
        }
        let totalMinutes = hours * 60 + minutes
        movie.duration = totalMinutes
        return movie
    })
    return moviesInMinutes
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null
    }
    let moviesCopy = JSON.parse(JSON.stringify(moviesArray))
    let sortedMovies = moviesCopy.sort(function (a, b) {
        return a.year - b.year
    })
    let bestYear = sortedMovies[0].year
    let bestAverage = scoresAverage(sortedMovies)
    for (let i = 0; i < sortedMovies.length; i++) {
        let currentYear = sortedMovies[i].year
        let currentMovies = []
        while (sortedMovies[i].year === currentYear) {
            currentMovies.push(sortedMovies[i])
            i++
        }
        i--
        let currentAverage = scoresAverage(currentMovies)
        if (currentAverage > bestAverage) {
            bestYear = currentYear
            bestAverage = currentAverage
        }
    }
    return `The best year was ${bestYear} with an average score of ${bestAverage}`
}
