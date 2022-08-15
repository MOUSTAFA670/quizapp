//



import { Quiz } from "./quiz.js"
export class Settings {

    constructor() {

        this.categoryElement = document.getElementById("category")
        this.startBtnElement = document.getElementById("startBtn")

        this.alert = document.getElementById("alert")
        this.difficultyElement = document.getElementsByName("difficulty")

        this.numberOfQuestionsElement = document.getElementById("numberOfQuestions")
        this.startBtnElement.addEventListener("click", this.startQuiz.bind(this))

    }
    async startQuiz() {
        let category = this.categoryElement.value
        let numberOfQuestions = this.numberOfQuestionsElement.value
        let difficulty = Array.from(this.difficultyElement).filter((ele) => ele.checked)[0].value
        let api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`

        let response = await this.fetchApi(api)
            // console.log(response);
        if (response.length > 0) {

            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500)
            })
            let quiz = new Quiz(response);
        } else {
            $("#alert").fadeIn(100)
        }
    }


    async fetchApi(api) {

        let response = await fetch(api);
        let result = await response.json();
        return result.results



    }
    return () {



    }
}