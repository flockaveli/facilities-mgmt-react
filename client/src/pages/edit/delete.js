

class UpdateRequest extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/requests/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteRequest extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the request ${this.props.id} permanently?`,
            )
        ) {
            api.deleteRequestById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}