React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.
<pre class="EnlighterJSRAW" data-enlighter-theme="atomic">class MoviesFromBefore extends React.Component {
  render() {
    return (
      &lt;div&gt;
        Who do you wanna call? {this.props.name}!
      &lt;/div&gt;
    );
  }
}

ReactDOM.render(
  &lt;MoviesFromBefore name="Ghostbusters" /&gt;,
  mountNode
);</pre>