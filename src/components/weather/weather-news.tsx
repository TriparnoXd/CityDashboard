import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rss } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import { Separator } from '../ui/separator';

interface WeatherNewsProps {
  news: NewsArticle[];
}

const WeatherNews: React.FC<WeatherNewsProps> = ({ news }) => {
  return (
    <Card className="transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Rss className="h-5 w-5 text-muted-foreground" />
          Weather News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {news.map((article, index) => (
            <React.Fragment key={index}>
              <li>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <h3 className="font-medium group-hover:text-primary">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                  <p className="text-xs text-muted-foreground/70">{article.source}</p>
                </a>
              </li>
              {index < news.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WeatherNews;
