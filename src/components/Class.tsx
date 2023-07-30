import React, { PureComponent } from 'react'

function addAge(Target: Function) {
    Target.prototype.age = 111
}

@addAge
class Class extends PureComponent {
    age?: number

    render() {
        return <h2>sxasxsxsxs--- {this.age}</h2>
    }
}

export default Class
