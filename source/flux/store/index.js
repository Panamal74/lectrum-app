import { EventEmitter } from 'events';

// Instruments
import dispatcher from '../dispatcher';

export default new class FeedStore extends EventEmitter {
    constructor () {
        super();

        this.store = {
            posts: [],
        };

        dispatcher.register((action) => {
            switch (action.type) {
                case 'FETCH_POSTS':
                    this.fetchPosts(action.payload);
                    break;
                default:
                    return false;
            }
        });
    }

    subscribe (callback) {
        this.on('change', callback);
    }

    unsubscribe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        this.emit('change');
    }

    getPosts () {
        return this.store.posts;
    }

    fetchPosts (posts) {
        this.store.posts = posts;
        this.update();
    }
}();
