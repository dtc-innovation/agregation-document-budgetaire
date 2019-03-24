workflow "Deploy npm build on gh-pages" {
  on = "push"
  resolves = ["Deploy to GitHub Pages"]
}

action "With Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch github-action"
}

action "Install npm dependencies" {
  uses = "actions/npm@master"
  args = "ci"
  needs = ["With Master Branch"]
}

action "Build" {
  uses = "actions/npm@master"
  needs = ["Install npm dependencies"]
  args = "run build"
}

action "Deploy to GitHub Pages" {
  uses = "gr2m/ghpages-1@4033a3c"
  needs = ["Build"]
  secrets = ["GITHUB_TOKEN"]
  env = {
    BUILD_DIR = "."
  }
}
