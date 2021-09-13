import { Component } from "react";
import './styles.css'
import MarkdownIt from 'markdown-it'

class Preview extends Component {
    state = {
        preview: null,
        md: new MarkdownIt()
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.setState({preview: this.props.preview})
        console.log(this.props.text)
    }

    render() {
        return (
            <div className="preview">
                <div className="previewcontainer">
                    <div className="preview-content">
                        <div dangerouslySetInnerHTML={{__html: this.state.md.render(this.props.text)}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview