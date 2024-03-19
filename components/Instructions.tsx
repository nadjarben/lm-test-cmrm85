const referencesLinks = {
  'Tailwind CSS Docs': 'https://tailwindcss.com/',
  'React hook form docs': 'https://react-hook-form.com/',
  'NextJS Testing': 'https://nextjs.org/docs/testing',
  fusejs: 'https://fusejs.io/',
};

function List({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-5 ml-2">{children}</ol>;
}

function Category({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <li>
      <b>{name}</b>
      <List>{children}</List>
    </li>
  );
}

export function Instructions() {
  return (
    <>
      <List>
        <b>Instructions:</b>
        <Category name="General">
          <li>This assignment should take upto but not limited to 4 hours</li>
          <li>Pay attention to your code style, comments and etc.</li>
          <li>We're expecting to get forked repo url - copy url or click on share button (left top corner)</li>
        </Category>
        <hr className="my-1" />
        <Category name="Checkbox">
          <li>
            Clicking on toggle checkbox button should toggle checkbox state. <br />
            <code className="bg-purple-400">checkboxValue</code> and checkbox state should be two way synced
          </li>
          <li>
            Checkbox should implement <code>value</code> and <code>onChange</code> callbacks
          </li>
        </Category>
        <Category name="Input">
          <li>
            Clicking on 'set input value' button should change input state <br />
            <code className="bg-green-400">textValue</code> and input state should be two way synced
          </li>
          <li>
            Input border bottom in focus state should change to green instead of blue when{' '}
            <code className="bg-cyan-400">customColorName</code> variable is green (changes on 'set green' button click)
          </li>
          <li>
            Input should implement <code>value</code> and <code>onChange</code> callbacks
          </li>
        </Category>
        <Category name="Implement react hook form">
          <li>Implement submit button and wrap everything in form</li>
          <li>
            Validate checkbox. required value: <code>true</code>.
          </li>
          <li>Validate Input value. minLength: 4, maxLength: 8, only latin letters</li>
          <li>Show error messages only after submitting</li>
        </Category>
        <Category name="API">
          <li>Make get request to `https://jsonplaceholder.typicode.com/posts`</li>
          <li>Show loader before http request and hide it after</li>
        </Category>
        <Category name="FuseJS">
          <li>
            Filter response by <code>title</code> using fusejs (implement hook) key based on input value and render it
          </li>
          <li>highlight matched characters using fusejs `includeMatches`</li>
        </Category>
        <li>
          Imrpove <b>Typescript</b> typings across the project
        </li>
        <li>Add jest testing - bonus (recomended)</li>
        <li>Imrpove design - bonus</li>
        <li>Imrpove component structure - bonus</li>
      </List>
      <h3 className="font-bold mt-2">References:</h3>
      <ul className="list-disc pl-5 text-blue-500 font-semibold">
        {Object.entries(referencesLinks).map(([text, url]) => (
          <li key={text}>
            <a className="underline hover:no-underline" href={url}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
