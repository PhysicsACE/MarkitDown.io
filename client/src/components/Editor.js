import { Component } from "react";
import './styles.css'
import AceEditor from 'react-ace'
import ReactResizeDetector from 'react-resize-detector'

class Editor extends Component {
    state = {
        text: '',
        type: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var currType = localStorage.getItem('type')
        this.setState({type: currType})
    }

    render() {
        if (this.state.type === 'index') {
            return (
                <ReactResizeDetector handleWidth handleHeight>
                    {({width, height}) => (
                        <AceEditor 
                        width={`100%/*${width}*/`}
                        height={`100%/*${height}*/`}
                        className="area"
                        mode="markdown"
                        onChange={this.props.change}
                        value={this.props.text}
                        editorProps={{$blockScrolling: Infinity}}
                        fontSize={14}
                        showPrintMargin={false}
                    />
                    )}
                </ReactResizeDetector>
            )
        } else {
            return (
                <ReactResizeDetector handleWidth handleHeight>
                    {({width, height}) => (
                        <AceEditor 
                        width={`100%/*${width}*/`}
                        height={`100%/*${height}*/`}
                        className="area"
                        mode="markdown"
                        onChange={this.props.change}
                        value={this.props.text}
                        editorProps={{$blockScrolling: Infinity}}
                        fontSize={14}
                        showPrintMargin={false}
                        readOnly
                    />
                    )}
                </ReactResizeDetector>
            )
        }
    }
}

export default Editor