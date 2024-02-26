import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
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
	const [sidebar, setSidebar] = useState(defaultArticleState);
	const [pageState, setPageState] = useState(defaultArticleState);

	const formSubmit = (e: React.MouseEvent) => {
		e.preventDefault();

		setPageState({
			...pageState,
			fontFamilyOption: sidebar.fontFamilyOption,
			fontSizeOption: sidebar.fontSizeOption,
			fontColor: sidebar.fontColor,
			contentWidth: sidebar.contentWidth,
			backgroundColor: sidebar.backgroundColor,
		});
	};

	const formReset = () => {
		setSidebar(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<div
			className={clix(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
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

				<Separator />

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
