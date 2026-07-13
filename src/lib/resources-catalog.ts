import { semesters } from "@/components/sections/ResourcesSection";

export function findCourseByFolderId(folderId: string) {
  for (const semester of semesters) {
    const course = semester.courses.find((c) => c.id === folderId);
    if (course) {
      return { semesterName: semester.name, courseTitle: course.title };
    }
  }
  return null;
}
