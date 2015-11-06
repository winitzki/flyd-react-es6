import F from 'flyd'
import T from 'union-type'
import R from 'ramda'

// input stream

const UserClickT = T({ Toggle: [] })

const input_stream = F.stream(UserClickT.Toggle()) // values of type UserClickT

// model

const init_model = { checked: false }

const make_new_model = (old_model, click) => UserClickT.case({
  Toggle: () => ({
    checked: !old_model.checked
  })
}, click)

const model_stream = F.scan(make_new_model, init_model, input_stream)

module.exports = {
  model_stream,
  input_stream,
  UserClickT
}
