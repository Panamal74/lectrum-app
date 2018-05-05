import React, { Component } from 'react';

import avatar from 'theme/assets/homer';

export class Composer extends Component {
    render () {
        return (
            <section>
                <form>
                    <div>
                        <img alt = 'homer' src = { avatar } />
                    </div>
                    <div>
                        <textarea
                            placeholder = { 'Hello world' }
                        />
                    </div>
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}