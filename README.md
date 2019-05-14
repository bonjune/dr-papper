# Dr. Papper
## Description
Dr.Papper Project for KAIST CS374 (Intro. to Human Computer Interaction)

1. Note-taking app for academic paper readers.
2. Simple app to organize academic papers with tag system.
3. User can find other notes which other readers have taken.

## InVision Prototype

[Click Here](https://invis.io/KQRE3E4FJZ6#/359227992_UnreadTap) to see our protytype works.

# How to contribute

## Branch

* dev : development version (main branch)

1. Make your own branch
  It is preferred to name the branch as your given name, name of a new feature to add. Anyway, please describe your branch with the branch name
2. PR to `dev` branch
  Feel free to push to dev if we have discussed the commits. Otherwise, make PR to review the codes. **DO NOT PR TO MASTER!!!!**

# Development

## Environment
* We use [React](https://github.com/facebook/react), JavaScript, [TypeScript](https://github.com/microsoft/TypeScript).
* The project is created by [create-react-app](https://github.com/facebook/create-react-app).

## Implementation 

### Papper

A user can create a review for a paper which he/she has been read. And the review for the paper is called papper.  
Papper contains title, authors, published date, where the paper is published, and so on. Please refer IReview interface to get more detailed information, which is implemented at [IReview in Firebase/interface.tsx](/app/src/components/Firebase/interface.tsx).

### PapperEditor and PapperView

**Not fully implemented yet.** These compoenents are hard-coded to perform the designated tasks. These two components are planned to be integrated since their tasks are can be abstracted into one. While editor edits the review's data, the view shows the review's data. You can visit the code at [PapperView Directory](app/src/components/PapperView) and [PapperEditor Directory](app/src/components/PapperEditor).

#### PapperEditor and PapperView Refactor Plan

PapperEditor/PapperView is integrated that the user can edit and view the papper at the same time.

### Board and Cardbox and Card

A card is simple represenation for the review. When a user click a card, the user can read the informations of the review that the card is pointing. The card has a reference to the review, the developer can choose what to show conveniently!

A CardBox is a collection of cards. The cards are passed by the boards. In addition, the boards pass a [Board/predicate.tsx](app/src/containers/Board/predicates.tsx) to the cardbox. The cardbox selects reviews by the predicate function.

A Board is a collection of cardboxes. Board is alse provided predicates to select Read, ToRead, Pinned, Deleted, and so on. [See how the predicates are passed to the boards.](app/src/containers/App/index.tsx) Also, you can create new predicates. e.g. You can dynamically create predicate selecting search result. In addition, the board is provided boardType prop to choose appropriate Board UI. You can see practical usage implemented at [Board/index.tsx](app/src/containers/Board/index.tsx)

### Tag System

The tag system is mainly relies on [TagsContext](app/src/components/Tag/context.tsx). The tag context is provided in App. You can see the withTag(App) at the bottom of the [App/index.tsx](app/src/containers/App/index.tsx).

Whenever you want to load tags, **do not load the tags from firebase directly.** Use withTags context. The loading leads to slowing this app down.

### Firebase

Firebase component is a class to call Firebase API. The useful methods to deal with pappers, tags, and user information are implemented in [Firebase/firebase.tsx])(app/src/components/Firebase/firebase.tsx). The firebase instance is provided by the FirebaseContext, The context is provided in [index.tsx](/index.tsx) and consumed by withFirebase HOC(Higher Order Compoent), which is declared at [Firebase/context/tsx](app/src/components/Firebase/context.tsx).

### MenuBar

MenuBar is an routing component to Read, ToRead, Pinned, Delete Board. Whenever the router links to one of those, MenuBar button will be hightlighed to that. Otherwise, none of the button is highlighted. This is implemented at [Menubar/index.tsx](app/src/components/MenuBar/index.tsx)

### NavigationBar

Navigation Bar is the component located at the top of the UI. This bar provides app logo, search bar, and sign out button when the user is authorized. Otherwise, the bar will provide the app logo and search bar, and sign in button. This is implemented at [MenuBar](app/src/components/MenuBar/index.tsx)

### Search

A search component is provided a qeury by the router. The search has a predicate property which defines how searching is performed. To modify the way this component searches the database, only you need is changing the predicate property. You can check the detail in [Search/index.tsx](app/src/components/Search/index.tsx).

## Guideline

### Language

Developing complex components (e.g. with lots of data), consider to use TypeScript rather than JavaScript. This prevents use forgetting dealing with implemeting small parts of the component.

Implementing small component with javascript would be faster than doing so with typescript. Don't bother yourself. :)

### Component Design

Try not to create different components that do the exactly same thing. This will sphagetti our project. Try your best to abstract your implementation and make it easy to manage, modify, and refactor.