import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { SubmitButton } from './components/submit-button';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PipelineToolbar />
      <div className="flex-1">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
