import MarkdownRender from '../Markdown';

interface TypicalViewComProps {
  data: string[];
}
export default function TypicalViewCom(props: TypicalViewComProps) {
  const { data } = props;
  return (
    <div className="">
      <p>典型观点:</p>
      {data.map((item, index) => {
        return <MarkdownRender key={index} content={item}></MarkdownRender>;
      })}
    </div>
  );
}
