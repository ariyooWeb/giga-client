"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, List, Card, Space } from "antd";
import { SmileTwoTone, MehTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import "./style.scss";

// Mock data - replace with actual data fetching later
import teamData from "../team/list/data"; // Using teamData for team names
import userData from "../user/list/data"; // Assuming this has all user data

const { RangePicker } = DatePicker;

// Mock attendance records for teams
const mockAttendanceRecords = [
  // Team 1: 씨멘트 (users 1,2,3,4,5 from teamData)
  { teamId: 1, userId: 1, date: "2026-01-13", attended: true },
  { teamId: 1, userId: 2, date: "2026-01-13", attended: true },
  { teamId: 1, userId: 3, date: "2026-01-13", attended: false },
  { teamId: 1, userId: 4, date: "2026-01-13", attended: true },
  { teamId: 1, userId: 5, date: "2026-01-13", attended: true },

  { teamId: 1, userId: 1, date: "2026-01-20", attended: true },
  { teamId: 1, userId: 2, date: "2026-01-20", attended: true },
  { teamId: 1, userId: 3, date: "2026-01-20", attended: true },
  { teamId: 1, userId: 4, date: "2026-01-20", attended: true },
  { teamId: 1, userId: 5, date: "2026-01-20", attended: true },

  { teamId: 1, userId: 1, date: "2026-01-27", attended: true },
  { teamId: 1, userId: 2, date: "2026-01-27", attended: true },
  { teamId: 1, userId: 3, date: "2026-01-27", attended: true },
  { teamId: 1, userId: 4, date: "2026-01-27", attended: true },
  { teamId: 1, userId: 5, date: "2026-01-27", attended: true },

  { teamId: 1, userId: 1, date: "2026-02-03", attended: true },
  { teamId: 1, userId: 2, date: "2026-02-03", attended: true },
  { teamId: 1, userId: 3, date: "2026-02-03", attended: true },
  { teamId: 1, userId: 4, date: "2026-02-03", attended: true },
  { teamId: 1, userId: 5, date: "2026-02-03", attended: true },

  // Team 2: 하모니 (users 6,7,8,9,10 from teamData)
  { teamId: 2, userId: 6, date: "2026-01-13", attended: true },
  { teamId: 2, userId: 7, date: "2026-01-13", attended: true },
  { teamId: 2, userId: 8, date: "2026-01-13", attended: true },
  { teamId: 2, userId: 9, date: "2026-01-13", attended: false },
  { teamId: 2, userId: 10, date: "2026-01-13", attended: true },

  { teamId: 2, userId: 6, date: "2026-01-20", attended: true },
  { teamId: 2, userId: 7, date: "2026-01-20", attended: true },
  { teamId: 2, userId: 8, date: "2026-01-20", attended: true },
  { teamId: 2, userId: 9, date: "2026-01-20", attended: true },
  { teamId: 2, userId: 10, date: "2026-01-20", attended: true },
  { teamId: 1, userId: 1, date: "2026-02-13", attended: true },
  { teamId: 1, userId: 2, date: "2026-02-13", attended: true },
  { teamId: 1, userId: 3, date: "2026-02-13", attended: false },
  { teamId: 1, userId: 4, date: "2026-02-13", attended: true },
  { teamId: 1, userId: 5, date: "2026-02-13", attended: true },
];

const AttendanceCountPage = () => {
  const [dateRange, setDateRange] = useState([null, null]); // [start, end]
  const [attendanceData, setAttendanceData] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null); // State to control expanded team

  useEffect(() => {
    // Initial calculation or recalculate when dateRange changes
    calculateAttendance();
  }, [dateRange]);

  const calculateAttendance = () => {
    const [startDate, endDate] = dateRange;
    let filteredRecords = mockAttendanceRecords;

    if (startDate && endDate) {
      filteredRecords = mockAttendanceRecords.filter((record) => {
        const recordDate = dayjs(record.date);
        return (
          (recordDate.isAfter(startDate, "day") ||
            recordDate.isSame(startDate, "day")) &&
          (recordDate.isBefore(endDate, "day") ||
            recordDate.isSame(endDate, "day"))
        );
      });
    }

    const teamAttendance = {};

    // Group records by teamId and then by userId
    filteredRecords.forEach((record) => {
      if (!teamAttendance[record.teamId]) {
        teamAttendance[record.teamId] = {
          totalAttendanceCount: 0, // Sum of attendedCount for all members in this team
          totalMembers: new Set(), // To count unique members in this team
          members: {},
        };
      }

      if (!teamAttendance[record.teamId].members[record.userId]) {
        teamAttendance[record.teamId].members[record.userId] = {
          attendedCount: 0,
          // totalSessions: 0, // Each record implies a session opportunity
        };
      }

      teamAttendance[record.teamId].totalMembers.add(record.userId); // Add unique member
      if (record.attended) {
        teamAttendance[record.teamId].members[record.userId].attendedCount++;
        teamAttendance[record.teamId].totalAttendanceCount++; // Sum of individual attendances
      }
    });

    // Calculate averages and format data for display
    const formattedData = Object.entries(teamAttendance).map(
      ([teamId, data]) => {
        const team = teamData.find((t) => t.id === parseInt(teamId)); // Find team by ID
        const teamName = team ? team.team : `Team ${teamId}`; // Use 'team' property for team name

        let totalTeamAttendance = 0;
        let totalTeamMembers = 0;

        const memberDetails = Object.entries(data.members).map(
          ([userId, memberData]) => {
            const user = userData.find((u) => u.id === parseInt(userId));
            const userName = user ? user.name : `User ${userId}`;

            totalTeamAttendance += memberData.attendedCount; // Accumulate for team total
            totalTeamMembers++; // Count this member towards the team average

            return {
              id: userId,
              name: userName,
              attendedCount: memberData.attendedCount, // Individual count
            };
          },
        );

        const averageTeamAttendance =
          totalTeamMembers > 0 ? totalTeamAttendance / totalTeamMembers : 0;

        return {
          id: teamId,
          name: teamName,
          average: averageTeamAttendance.toFixed(1), // Average count per member in the team
          members: memberDetails,
          highlight: averageTeamAttendance >= 4, // Highlight if average count is 4 or more
        };
      },
    );

    setAttendanceData(formattedData);
  };

  const handleRangeChange = (dates) => {
    setDateRange(dates);
  };

  const toggleExpand = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="page-container">
      <div className="common-form">
        <h1>참석률 조회</h1>
        <div className="range-picker-container">
          <RangePicker onChange={handleRangeChange} />
        </div>

        {dateRange[0] && dateRange[1] ? (
          <List
            itemLayout="vertical"
            dataSource={attendanceData}
            renderItem={(team) => (
              <List.Item
                className={`team-item ${team.highlight ? "highlight" : ""}`}
                onClick={() => toggleExpand(team.id)}
              >
                <Card className="team-card">
                  <Card.Meta
                    title={
                      <div className="count-card-title">
                        <div className="count-card-title-left">
                          <div className="count-card-title-left-team">
                            {team.name}
                          </div>
                          <div className="count-card-title-left-count">
                            평균 <span>{team.average}</span>회
                          </div>
                        </div>
                        {team.highlight ? (
                          <SmileTwoTone
                            twoToneColor="#eb2f96"
                            style={{ fontSize: 32 }}
                          />
                        ) : (
                          <MehTwoTone
                            twoToneColor="gray"
                            style={{ fontSize: 32 }}
                          />
                        )}
                      </div>
                    }
                    description={
                      expandedTeam === team.id && (
                        <div className="member-details">
                          {team.members.length === 0 ? (
                            <p>참석 기록이 없습니다.</p>
                          ) : (
                            <List
                              dataSource={team.members}
                              renderItem={(member) => (
                                <List.Item>
                                  <Space>
                                    <span>{member.name}:</span>
                                    <span>{member.attendedCount}회</span>{" "}
                                    {/* Removed (average) here */}
                                  </Space>
                                </List.Item>
                              )}
                            />
                          )}
                        </div>
                      )
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <div className="placeholder-message">기간을 선택해주세요</div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCountPage;
