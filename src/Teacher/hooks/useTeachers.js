import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import teacherService from "../services/teacherService";
import useSchool from "../../School/hooks/useSchool";

const useTeachers = () => {
  const { user } = useSelector((state) => state.auth);
  const { school } = useSchool();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTeachers = useCallback(async () => {
    if (!user || !school?.schoolId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const result = await teacherService.getTeachersBySchool(
        school.schoolId
      );

      if (result.success) {
        setTeachers(result.data);
        setError("");
      } else {
        setTeachers([]);
        setError(result.message);
      }
    } catch (err) {
      console.error(err);

      setTeachers([]);
      setError("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  }, [user, school]);

  const searchTeacher = async (teacherId) => {
    try {
      return await teacherService.findTeacherByTeacherId(
        teacherId
      );
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to search teacher.",
      };
    }
  };

const inviteTeacher = async (teacher) => {
  try {
    setSaving(true);

    return await teacherService.sendTeacherInvitation({
      teacherUid: teacher.teacherUid,
      teacherId: teacher.teacherId,
      teacherName: teacher.displayName,
      teacherPhoto: teacher.photoURL,

      adminUid: user.uid,
      adminName: user.displayName,

      schoolId: school.schoolId,
      schoolName: school.instituteName,
    });
  } finally {
    setSaving(false);
  }
};

  const removeTeacherFromSchool = async (teacherUid) => {
    try {
      setSaving(true);

      const result =
        await teacherService.removeTeacherFromSchool({
          teacherUid,
          schoolId: school.schoolId,
        });

      if (result.success) {
        await loadTeachers();
      }

      return result;
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to remove teacher.",
      };
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  return {
    teachers,

    loading,
    saving,
    error,

    loadTeachers,
    refresh: loadTeachers,

    searchTeacher,
    inviteTeacher,

    removeTeacherFromSchool,
  };
};

export default useTeachers;