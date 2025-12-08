export function numX(n: number, width: number, height: number) {
  return (
    Math.sqrt((width / height) * n + Math.pow(width - height, 2) / (4 * Math.pow(height, 2))) -
    (width - height) / (2 * height)
  );
}

export function getColor(color: string, opacity = 100) {
  switch (color) {
    case 'black':
      return `rgba(55, 65, 81, ${opacity}%)`;

    case 'blue':
      return `rgba(2, 0, 140, ${opacity}%)`;

    case 'red':
      return `rgba(199, 0, 1, ${opacity}%)`;

    default:
      return `rgba(0, 0, 0, ${opacity}%)`;
  }
}

export function roundRect(x: number, y: number, width: number, height: number) {
  return [
    `M${x} ${y}`,
    `L${x + width} ${y}`,
    `L${x + width} ${y + height}`,
    `L${x} ${y + height}`,
    'Z',
  ].join(' ');
}

/**
 * SVG Path rounding function. Takes an input path string and outputs a path
 * string where all line-line corners have been rounded. Only supports absolute
 * commands at the moment.
 */
export function roundPathCorners(pathString: string, radius: number, useFractionalRadius: boolean) {
  function moveTowardsLength(
    movingPoint: { x: number; y: number },
    targetPoint: { x: number; y: number },
    amount: number
  ) {
    const width = targetPoint.x - movingPoint.x;
    const height = targetPoint.y - movingPoint.y;

    const distance = Math.sqrt(width * width + height * height);

    return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
  }
  function moveTowardsFractional(
    movingPoint: { x: number; y: number },
    targetPoint: { x: number; y: number },
    fraction: number
  ) {
    return {
      x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
      y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction,
    };
  }

  // Adjusts the ending position of a command
  function adjustCommand(cmd: any[], newPoint: { x: number; y: number }) {
    if (cmd.length > 2) {
      cmd[cmd.length - 2] = newPoint.x;
      cmd[cmd.length - 1] = newPoint.y;
    }
  }

  // Gives an {x, y} object for a command's ending position
  function pointForCommand(cmd: any[]) {
    return {
      x: parseFloat(cmd[cmd.length - 2]),
      y: parseFloat(cmd[cmd.length - 1]),
    };
  }

  // Split apart the path, handing concatonated letters and numbers
  const pathParts = pathString.split(/[,\s]/).reduce(function (parts: any[], part) {
    const match = part.match('([a-zA-Z])(.+)');
    if (match) {
      parts.push(match[1]);
      parts.push(match[2]);
    } else {
      parts.push(part);
    }

    return parts;
  }, []);

  // Group the commands with their arguments for easier handling
  const commands = pathParts.reduce(function (commands: any[], part) {
    if (parseFloat(part) == part && commands.length) {
      commands[commands.length - 1].push(part);
    } else {
      commands.push([part]);
    }

    return commands;
  }, []);

  // The resulting commands, also grouped
  let resultCommands = [];

  if (commands.length > 1) {
    const startPoint = pointForCommand(commands[0]);

    // Handle the close path case with a "virtual" closing line
    let virtualCloseLine = null;
    if (commands[commands.length - 1][0] == 'Z' && commands[0].length > 2) {
      virtualCloseLine = ['L', startPoint.x, startPoint.y];
      commands[commands.length - 1] = virtualCloseLine;
    }

    // We always use the first command (but it may be mutated)
    resultCommands.push(commands[0]);

    for (let cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
      const prevCmd = resultCommands[resultCommands.length - 1];

      const curCmd = commands[cmdIndex];

      // Handle closing case
      const nextCmd = curCmd == virtualCloseLine ? commands[1] : commands[cmdIndex + 1];

      // Nasty logic to decide if this path is a candidite.
      if (
        nextCmd &&
        prevCmd &&
        prevCmd.length > 2 &&
        curCmd[0] == 'L' &&
        nextCmd.length > 2 &&
        nextCmd[0] == 'L'
      ) {
        // Calc the points we're dealing with
        const prevPoint = pointForCommand(prevCmd);
        const curPoint = pointForCommand(curCmd);
        const nextPoint = pointForCommand(nextCmd);

        // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
        var curveStart, curveEnd;

        if (useFractionalRadius) {
          curveStart = moveTowardsFractional(
            curPoint,
            // @ts-ignore
            prevCmd.origPoint || prevPoint,
            radius
          );
          curveEnd = moveTowardsFractional(
            curPoint,
            // @ts-ignore
            nextCmd.origPoint || nextPoint,
            radius
          );
        } else {
          curveStart = moveTowardsLength(curPoint, prevPoint, radius);
          curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
        }

        // Adjust the current command and add it
        adjustCommand(curCmd, curveStart);
        // @ts-ignore
        curCmd.origPoint = curPoint;
        resultCommands.push(curCmd);

        // The curve control points are halfway between the start/end of the curve and
        // the original point
        const startControl = moveTowardsFractional(curveStart, curPoint, 0.5);
        const endControl = moveTowardsFractional(curPoint, curveEnd, 0.5);

        // Create the curve
        const curveCmd = [
          'C',
          startControl.x,
          startControl.y,
          endControl.x,
          endControl.y,
          curveEnd.x,
          curveEnd.y,
        ];
        // Save the original point for fractional calculations
        // @ts-ignore
        curveCmd.origPoint = curPoint;
        resultCommands.push(curveCmd);
      } else {
        // Pass through commands that don't qualify
        resultCommands.push(curCmd);
      }
    }

    // Fix up the starting point and restore the close path if the path was orignally closed
    if (virtualCloseLine) {
      const newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
      resultCommands.push(['Z']);
      adjustCommand(resultCommands[0], newStartPoint);
    }
  } else {
    resultCommands = commands;
  }

  return resultCommands.reduce(function (str, c) {
    return str + c.join(' ') + ' ';
  }, '');
}
