import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';
import { TagList } from '@shared/ui/tag-list/tag-list';

@Component({
  selector: 'app-tech-stacks-section',
  imports: [PageSection, FeatureCard, TagList],
  templateUrl: './tech-stacks-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class TechStacksSection {
  protected readonly stacks = [
    {
      number: "MEAN STACK", title: "MEAN",
      description: "MongoDB, Express, Angular, and Node.js for full-stack web applications, REST APIs, business logic, and scalable application workflows.",
      tags: ["Node.js", "Express", "Angular", "MongoDB", "REST APIs", "JavaScript"],
    },
    {
      number: ".NET", title: "Microsoft .NET",
      description: "C#, ASP.NET, Entity Framework, LINQ, SQL Server, MVC/Web API, authentication, authorization, and enterprise application development.",
      tags: ["C#", ".NET", "ASP.NET", "Entity Framework", "LINQ", "SQL Server"],
    },
  ];
}
