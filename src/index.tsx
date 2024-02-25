import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef } from 'react';
import clix from 'clsx';
import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const [sidebar, setSidebar] = useState(defaultArticleState);

	const formSubmit = (e: React.MouseEvent) => {
		e.preventDefault();

		if (divRef.current) {
			divRef.current.style.setProperty(
				'--font-family',
				sidebar.fontFamilyOption.value
			);
			divRef.current.style.setProperty(
				'--font-size',
				sidebar.fontSizeOption.value
			);
			divRef.current.style.setProperty('--font-color', sidebar.fontColor.value);
			divRef.current.style.setProperty(
				'--container-width',
				sidebar.contentWidth.value
			);
			divRef.current.style.setProperty(
				'--bg-color',
				sidebar.backgroundColor.value
			);
		}
	};

	const formReset = () => {
		setSidebar(defaultArticleState);

		if (divRef.current) {
			divRef.current.style.setProperty(
				'--font-family',
				sidebar.fontFamilyOption.value
			);
			divRef.current.style.setProperty(
				'--font-size',
				sidebar.fontSizeOption.value
			);
			divRef.current.style.setProperty('--font-color', sidebar.fontColor.value);
			divRef.current.style.setProperty(
				'--container-width',
				sidebar.contentWidth.value
			);
			divRef.current.style.setProperty(
				'--bg-color',
				sidebar.backgroundColor.value
			);
		}
	};

	return (
		<div
			ref={divRef}
			className={clix(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm formSubmit={formSubmit} formReset={formReset}>
				<Select
					selected={sidebar.fontFamilyOption}
					onChange={(option) =>
						setSidebar({
							...sidebar,
							fontFamilyOption: option,
						})
					}
					options={fontFamilyOptions}
					title={'шрифт'}
				/>
				<RadioGroup
					selected={sidebar.fontSizeOption}
					onChange={(option) =>
						setSidebar({
							...sidebar,
							fontSizeOption: option,
						})
					}
					options={fontSizeOptions}
					title={'размер шрифта'}
					name={'размер шрифта'}
				/>
				<Select
					selected={sidebar.fontColor}
					onChange={(option) =>
						setSidebar({
							...sidebar,
							fontColor: option,
						})
					}
					options={fontColors}
					title={'цвет шрифта'}
				/>
				Separator
				<Separator />
				Separator
				<Select
					selected={sidebar.backgroundColor}
					onChange={(option) =>
						setSidebar({
							...sidebar,
							backgroundColor: option,
						})
					}
					options={backgroundColors}
					title={'цвет фона'}
				/>
				<Select
					selected={sidebar.contentWidth}
					onChange={(option) =>
						setSidebar({
							...sidebar,
							contentWidth: option,
						})
					}
					options={contentWidthArr}
					title={'ширина контента'}
				/>
			</ArticleParamsForm>

			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
