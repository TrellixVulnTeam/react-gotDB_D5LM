import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotServices';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount () {
        this.updateCharacter();
    }

    componentDidUpdate (prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    onCharacterDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    updateCharacter () {
        const {charId} = this.props;

        if (!charId) {
            return;
        };

        this.setState({
            loading: true
        });
        
        this.gotService.getCharacter(charId)
            .then(this.onCharacterDetailsLoaded)
            .catch(() => this.onError());
        // this.foo.bar = 0;
    }

    onError () {
        this.setState({
            char: null,
            error: true
        });
    }

    render() {
        
        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <span className="select-error">Please, select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.char;

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="person-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}