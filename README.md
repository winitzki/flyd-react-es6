# flyd-react-es6

This repo carries some skeleton files to support JavaScript ES6 / webpack / react / flyd development.

Run `npm install` and `npm start` to see the demo app at `localhost:8080`.

Run `npm run build` to prepare an optimized, minified build (about 170 KB unzipped).

# Using React with flyd

The component [`App`](https://github.com/winitzki/flyd-react-es6/blob/master/app/components/App.jsx) uses flyd streams to manage its state, i.e. the state of `App` is a stream of values.
The UI events (checkbox toggles) are converted to a flyd stream using `scan`.
`React` is used only as a function from `App`'s state to DOM.

## Required boilerplate

- Define `componentDidMount` with one-line boilerplate each (no easy mixins in ES6!), setting the state

# The FRP architecture

The main idea of FRP is to replace data mutation with data streams.
All streams are understood as sequences of immutable data values.
An FRP program defines some streams as pure functions of other streams.

In a GUI program, there may be be several input streams (UI events, peripherals) and a single output stream (the "view").

The architecture of the sample application follows a very simple FRP design,
which defines three streams called `ui_events`, `states`, and `views`.

(1) `states` = _flyd.scan_(_updater_, initial state, `ui_events`)

(2) `views` = _React.render_ (`states`)

(3) View event callbacks and all other GUI input events are converted into flyd events and merged into the `ui_events` stream

Note that steps (1) and (2) are pure functions that transform streams into streams.

For example, the _updater_ in step (1) is a pure function that computes the new state, given the old state and a UI event.
This function represents the business logic of the application.

Step (2) is a pure function that renders the model state into a view.
Technically, `React.render` does not produce a flyd stream of "view" values.
However, it is helpful to imagine that it does, since the effect is very similar:
a new view is created whenever the state changes.

Step (3) uses some low-level boilerplate to do two essential things:

- convert a flyd stream of states into the React `setState` calls
- provide DOM callbacks such as `onClick` that will emit events into the `ui_events` stream

In most cases, `ui_events` is a function of `views` since some events may depend on the presence of absence of certain DOM elements.
So, strictly speaking, all three streams (`ui_events`, `states`, `views`) could be defined through mutual recursion without any low-level code.
However, we are limited by the architecture of `React`, which does not use streams and does not produce any output values of type "view".

# To do

- See if the boilerplate can be reduced with some kind of mixin

- Make an example app that sends XHR requests using streams

- Copy only the minimum set of primitives from flyd: map, map2, scan, drop, sample, flatMap

- Add primitives for async operations
