export default function A(
  {href, title, target, rel, className, children}:
  {href: string, title?: string, target?: string, rel?: string, className?: string, children: string}) {
	return <a href={href} title={title} className={`
	underline underline-offset-2
  hover:text-amber-400
	transition duration-200
	${className}`}
	target={target} rel={rel}>
		{children}
	</a>
}