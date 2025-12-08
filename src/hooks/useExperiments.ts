import { useState, useEffect } from 'react';

export interface Experiment {
  id: string;
  title: string | null;
  image: string | undefined;
  link: string | null;
  type: 'gist' | 'observable';
  createdAt: Date;
  updatedAt?: Date;
}

export const useExperiments = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const res = await fetch('https://api.github.com/users/jonsadka/gists?per_page=100');
        const gists = await res.json();
        return gists
          .filter((gist: any) => gist.files['thumbnail.png'] && gist.files['thumbnail.png'].raw_url)
          .map((gist: any) => ({
            id: gist.id,
            title: gist.description,
            image: gist.files['thumbnail.png'].raw_url,
            link: `https://bl.ocks.org/jonsadka/${gist.id}`,
            type: 'gist',
            updatedAt: new Date(gist.updated_at),
            createdAt: new Date(gist.created_at),
          }));
      } catch (e) {
        return [];
      }
    };

    const fetchObservable = async () => {
      try {
        const res = await fetch('https://api.observablehq.com/documents/@jonsadka.rss');
        const text = await res.text();
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item'));
        return items.map((item: any) => {
          const title = item.querySelector('title')?.textContent;
          const link = item.querySelector('guid')?.textContent;
          const pubDate = item.querySelector('pubDate')?.textContent;
          const description = item.querySelector('description')?.textContent || '';
          // Extract first image from description
          const match = description.match(/<img src="([^"]+)"/);
          const image = match ? match[1] : undefined;
          return {
            id: link,
            title,
            image,
            link,
            createdAt: new Date(pubDate),
            type: 'observable',
          };
        });
      } catch (e) {
        return [];
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      const [gists, observables] = await Promise.all([fetchGists(), fetchObservable()]);
      // Sort by created date (descending)
      const all = [...gists, ...observables]
        .filter(
          (d) =>
            ![
              '19f1366db3ff25195e650ec90d404092',
              '83efd9fe1958eb5c57e307353b3359ac',
              'f78367c32532a9e1f51aa2248247c6f4',
              '810749b7dbcf0eca1e4e',
              '00e6248efe5605c1fa5c',
              '07ed66cc6fc394d6ea53',
              'c1f75dfceeac5947da9b316469753b16',
              'https://observablehq.com/@jonsadka/inputs/3',
              'https://observablehq.com/@jonsadka/visual-comparisons-of-various-bar-chart-properties',
              'https://observablehq.com/@jonsadka/generative-patterns',
              'a08354802fb2fd7fd87e6f9931f06671',
              'https://observablehq.com/@jonsadka/plot-cheatsheets-marks',
              'https://observablehq.com/@jonsadka/plot-cheatsheets-layouts',
              'https://observablehq.com/@jonsadka/plot-cheatsheets-colors',
            ].includes(d.id)
        )
        .sort((a, b) => {
          const aDate = a.createdAt?.valueOf() || a.updatedAt?.valueOf();
          const bDate = b.createdAt?.valueOf() || b.updatedAt?.valueOf();
          // Try to parse as date, fallback to string compare
          const aTime = aDate ? new Date(aDate).getTime() : 0;
          const bTime = bDate ? new Date(bDate).getTime() : 0;
          return bTime - aTime;
        });
      setExperiments(all);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { experiments, loading };
};
