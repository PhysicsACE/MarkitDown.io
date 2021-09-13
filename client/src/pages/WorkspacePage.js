import {Component} from 'react'
import Split from 'react-split'
import {Spinner} from 'reactstrap'
import { api } from '../js/api'
import debounce from 'lodash/debounce'
import Editor from '../components/Editor'
import Preview from '../components/Preview'

class WorkspacePage extends Component {
    state = {
        text: '',
        loading: false
    }

    loadState = this.loadState.bind(this)
    handleWOrkSpaceChange = this.handleWOrkSpaceChange.bind(this)
    workspaceSaveDebounced = debounce(this.workspaceSave, 1000)
    handleTextChange = this.handleTextChange.bind(this)

    constructor(props) {
        super(props);
        if (props.match.params.id) {
            this.state.loading = true
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params
        if (id) {
            api.get(`workspace/${id}`).then(({data}) => {
                console.log(data)
                this.loadState(data)
                this.setState({loading: false})
            })
        }
    }

    loadState(data) {
        console.log(data)
        if (data.id !== this.props.match.params.id) {
            this.props.history.push(`/workspace/${data.id}`)
        }
        this.setState({
            text: data.text
        })
    }

    handleTextChange(s) {
      this.setState({text: s})
      this.workspaceSave()
    }

    handleWOrkSpaceChange(value) {
        this.setState((state) => ({
            text: value
        }))
        this.workspaceSaveDebounced()
    }

    workspaceSave() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            api.put(`/workspace/${this.props.match.params.id}/save`, {'text': this.state.text})
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex h-100 align-items-center justify-content-center">
                    <Spinner style={{width: '3rem', height: "3rem"}} type="grow" />
                </div>
            )
        }

        return (
            <Split direction="horizontal" sizes={[50, 50]} minSize={0} snapOffset={400} gutterSize={12} className="split-parent-horizontal">
                <div className="editor-pane">
                    <Editor text={this.state.text} change={this.handleWOrkSpaceChange}/>
                </div>
                <Preview text={this.state.text}/>
            </Split>
        )
    }
}

export default WorkspacePage
