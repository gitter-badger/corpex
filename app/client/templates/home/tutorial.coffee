tutorialSteps = [
    template: "tutorial_1"
  ,
    template: "tutorial_2"
    spot: ".form-group"
    #require:
    #  event: "something-emitted"
]

Session.setDefault "tutorialNotFinished", true

Template.home.helpers
  options:
    id: "myCoolTutorial"
    steps: tutorialSteps
    onFinish: ->
      Session.set "tutorialNotFinished", false
  tutorialNotFinished: ->
    Session.get "tutorialNotFinished"